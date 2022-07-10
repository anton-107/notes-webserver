import { InMemoryPersonStore } from "../../src/stores/person/person-store";

describe("Person store", () => {
  it("should throw an error when trying to edit non-existing person", async () => {
    const s = new InMemoryPersonStore();

    await expect(
      async () =>
        await s.editOne({
          id: "some-non-existing id",
          name: "",
          email: "",
          manager: "",
        })
    ).rejects.toThrow("Person is not found");
  });
  it("should throw an error when trying to delete non-existing person", async () => {
    const s = new InMemoryPersonStore();

    await expect(
      async () => await s.deleteOne("", "some-non-existing id")
    ).rejects.toThrow("Person is not found");
  });
});
