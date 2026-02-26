import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // <-- IMPORT ROUTER
import PropertyCard from "../../Components/PropertyCard";
import { PropertyProvider } from "../../Context/PropertyContext";

const property = {
  id: "prop1",
  type: "House",
  location: "SE20",
  price: 500000,
  bedrooms: 3,
  picture: "test.jpg",
  description: "Test Property",
};

describe("PropertyCard Component", () => {
  it("adds property to favourites when button clicked", async () => {
    const user = userEvent.setup();

    render(
      <PropertyProvider>
        <MemoryRouter>
          <PropertyCard property={property} />
        </MemoryRouter>
      </PropertyProvider>
    );


    //CLICK THE FAVOURITE BUTTON
    const favButton = await screen.findByText("Add to Favourites");
    //EXPECT IT TO BE FAVOURITED
    await user.click(favButton);

    //CLICK THE REMOVE FROM FAVOURITE BUTTON
    const removeButton = await screen.findByText("Remove from Favourites");
    //EXPECT IT BE REMOVED
    expect(removeButton).toBeInTheDocument();
  });






  it("removes property from favourites when clicked again", async () => {
    const user = userEvent.setup();

    render(
      <PropertyProvider>
        <MemoryRouter>
          <PropertyCard property={property} />
        </MemoryRouter>
      </PropertyProvider>
    );

    //REMOVE PROPERTY FROM FAVOURITE (CARRIES ON FROM THE PRPERTY THAT WAS ADDED TO FAVOURITE)
    const removeButton = await screen.findByText("Remove from Favourites");
    await user.click(removeButton);

    //ADD TO FAVOURITE
    const favButton = screen.getByText("Add to Favourite");
    await user.click(favButton);

    //CHECK IF ADD TO FAVOURITE IS DISPLAYED AGAIN
    expect(favButton).toBeInTheDocument();


  });
});
