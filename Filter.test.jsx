import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Filter from "./Filter";

describe("Filter Component", () => {
  it("renders Filter component with default values", () => {
    render(<Filter />);

    const minPrice = screen.getByTestId("minPrice");
    expect(minPrice).toBeInTheDocument();
    expect(minPrice.value).toBe("0"); //RANGE VALUES ARE STRINGS, NOT INTEGERS
  });




  it("initialises with all the filter components present", () => {
    render(<Filter/>);

    // PROPERTY TYPE SELECT
    const typeSelect = screen.getByLabelText(/Property Type/i);
    expect(typeSelect).toBeInTheDocument();
    expect(typeSelect.value).toBe(""); //DEFAULT IS ANY

    // POSTCODE INPUT
    const postcodeInput = screen.getByPlaceholderText(/BR5, SE20, etc\./i);
    expect(postcodeInput).toBeInTheDocument();
    expect(postcodeInput.value).toBe("");

    // PRICE SLIDERS
    const minPriceSlider = screen.getByTestId("minPrice");
    expect(minPriceSlider).toBeInTheDocument();
    expect(minPriceSlider.value).toBe("0"); //INITIAL VALUE

    // MAX PRICE slider (without testid, so we query by role and max value)
    const priceSliders = screen.getAllByRole("slider");
    expect(priceSliders.length).toBeGreaterThanOrEqual(2);

    // BEDROOM SLIDERS
    const bedroomSliders = priceSliders.slice(-2); //USES THE LAST 2 SLIDERS (VIA SLICING)
    expect(bedroomSliders[0].value).toBe("0"); // [0] IS MINBEDS
    expect(bedroomSliders[1].value).toBe("6"); // [1] IS MAXBEDS

    // DATE PICKER
    const dateInput = screen.getByLabelText(/Date Added/i);
    expect(dateInput).toBeInTheDocument();
    expect(dateInput.value).toBe("");

    // SEARCH BUTTON
    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();

    // RESET BUTTON
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();

  })


  it("change around values of filters", async() => {
    const user = userEvent.setup();
    render(<Filter />);

    const typeSelect = screen.getByLabelText(/Property Type/i);
    expect(typeSelect).toBeInTheDocument();
    expect(typeSelect.value).toBe(""); //SHOULD CURRENTLY BE ON ANY

    //SELECT HOUSE
    await user.selectOptions(typeSelect, "House");

    //EXPECT VALUE OF SELECT TO NOW BE HOUSE
    expect(typeSelect.value).toBe("House");
  })



  it("reset filter button sets all filter values back to default", async() => {
    const user = userEvent.setup();
    render(<Filter />);

    const typeSelect = screen.getByLabelText(/Property Type/i);
    expect(typeSelect.value).toBe(""); //SHOULD CURRENTLY BE ON DEFAULY

    //SELECT FLAT
    await user.selectOptions(typeSelect, "Flat");
    expect(typeSelect.value).toBe("Flat"); //EXPECT VALUE TO NOW BE FLAT

    //CLICK THE RESET BUTTON
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    await user.click(resetButton);

    //EXPECT PROPERTY TYPE TO RETURN BACK TO DEFAULT ANY
    expect(typeSelect.value).toBe("");
  })


});
