import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsTable from "./ProjectsTable";

describe("ProjectsTable", () => {
  test("adds a new project when Add button is clicked", () => {
    render(<ProjectsTable />);

    // type into inputs
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/Owner/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "This is a test project" },
    });

    // click add
    fireEvent.click(screen.getByRole("button", { name: /Add Project/i }));

    // check that new project appears in table
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  test("updates form input when typing in title", async () => {
    render(<ProjectsTable />);
    const input = screen.getByLabelText(/Title/i);

    await userEvent.type(input, "My Title");
    expect(input).toHaveValue("My Title");
  });
});
