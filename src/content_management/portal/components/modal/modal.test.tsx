import React from "react";
import { render } from "@testing-library/react";
import Modal from "./modal";

describe("Modal component", () => {
  it("should not render anything when isOpen is false", () => {
    const { container } = render(<Modal isOpen={false} title="Modal title" />);
    expect(container.firstChild).toBeNull();
  });

  it("should render the modal when isOpen is true", () => {
    const { getByTestId } = render(<Modal isOpen={true} title="Modal title" />);
    const modal = getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  it("should render the title correctly", () => {
    const { getByText } = render(<Modal isOpen={true} title="Modal title" />);
    const title = getByText("Modal title");
    expect(title).toBeInTheDocument();
  });

  it("should render the children correctly", () => {
    const { getByTestId } = render(
      <Modal isOpen={true} title="Modal title">
        <div data-testid="modal-content">Modal content</div>
      </Modal>
    );
    const modalContent = getByTestId("modal-content");
    expect(modalContent).toBeInTheDocument();
  });
});
