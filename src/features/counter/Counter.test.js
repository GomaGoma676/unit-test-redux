import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";
import { increment, decrement } from "./counterSlice";
import { useSelector, useDispatch } from "react-redux";

jest.mock("./counterSlice");
jest.mock("react-redux");
const useSelectorMock = useSelector;
const useDispatchMock = useDispatch;

beforeEach(() => {
  useSelectorMock.mockReturnValue(10);
  useDispatchMock.mockReturnValue(jest.fn());
});
afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});
describe("Unit test : Stub(useSelector) Mock(useDispatch:actions)", () => {
  it("Should render the value from useSelector", () => {
    render(<Counter />);
    expect(screen.getByTestId("counter")).toHaveTextContent(10);
  });
  it("Should call the increment/decrement actions each 2 times by user click", () => {
    render(<Counter />);
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("-"));
    userEvent.click(screen.getByText("-"));
    expect(increment).toBeCalledTimes(2);
    expect(decrement).toBeCalledTimes(2);
  });
});
