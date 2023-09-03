"use client";
import { useSearchModal } from "@/app/hooks/useSearchModal";
import Modals from "./Modals";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [bathroomCount, setBathroomCount] = useState();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(()=>{
    setStep((value)=>value-1)
  }, [])

  const onNext = useCallback(()=>{
    setStep((value)=>value+1)
  }, [])

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(()=>{
    if(step === STEPS.INFO){
        return "Search"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(()=>{
    if(step === STEPS.LOCATION){
        return undefined
    }
  }, [])

//   Location
  let bodyContent = (
    <div className="flex flex-col gap-8" > 
        <Heading title="Where do you want to go?" subtitle="Find the perfect location!" />
        <CountrySelect value={location} onChange={(value)=>setLocation(value as CountrySelectValue)} />
        <hr />
        <Map center={location?.latlng} /> 
    </div>
  )

//   Date
  if(step===STEPS.DATE){
    bodyContent = (
        <div className="flex flex-col gap-8">

        </div>
    )
  }

  return (
    <Modals
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      title='Filters'
      body={bodyContent}
    />
  );
};

export default SearchModal;
