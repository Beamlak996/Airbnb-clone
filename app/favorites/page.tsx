import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }
  const listings = await getFavoriteListing();

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No Favorites'
        subtitle='Looks like you have no favorite listings.'
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritePage;
