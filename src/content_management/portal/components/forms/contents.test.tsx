import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewContent from ".";

describe("NewContent component", () => {
  test("renders form inputs", () => {
    render(<NewContent openModal={() => {}} content={[]} />);
    const nameInput = screen.getByLabelText("Nombre");
    const descriptionInput = screen.getByLabelText("Descripción");
    const categoryInput = screen.getByLabelText("Categoría");
    const fileInput = screen.getByLabelText("Selecciona una imagen");

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
  });

  test("sends form data when submitted", async () => {
    const mockCreateContent = jest.fn();
    const mockSort = jest.fn(() => [{ ID: 1 }]);
    const mockContent = [{ CATEGORY: "Category" }];
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    global.URL.createObjectURL = jest.fn(() => "test-url");
    global.window.location.href = "/";

    render(
      <NewContent
        openModal={() => {}}
        content={mockContent}
      />
    );

    const nameInput = screen.getByLabelText("Nombre");
    const descriptionInput = screen.getByLabelText("Descripción");
    const categoryInput = screen.getByLabelText("Categoría");
    const fileInput = screen.getByLabelText("Selecciona una imagen");
    const createButton = screen.getByText("Crear");

    fireEvent.change(nameInput, { target: { value: "Test name" } });
    fireEvent.change(descriptionInput, { target: { value: "Test description" } });
    fireEvent.change(categoryInput, { target: { value: "Category" } });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockCreateContent).toHaveBeenCalledWith({
        variables: {
          NAME: "Test name",
          DESCRIPTION: "Test description",
          CATEGORY: "Category",
          COVER: "test-url",
        },
      });
      expect(global.window.location.href).toEqual("/cmgt/editor/2");
    });
  });
});
