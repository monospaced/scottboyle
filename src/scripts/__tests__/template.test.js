describe("template script", () => {
  it("writes the template file", () => {
    const log = jest.fn();
    const error = jest.fn();
    const exit = jest.fn();
    const readFileSync = jest.fn().mockReturnValue("<html />");
    const mkdirSync = jest.fn();
    const writeFileSync = jest.fn();

    jest.resetModules();
    jest.doMock("fs", () => ({
      readFileSync,
      mkdirSync,
      writeFileSync,
    }));
    jest.spyOn(console, "log").mockImplementation(log);
    jest.spyOn(console, "error").mockImplementation(error);
    jest.spyOn(process, "exit").mockImplementation(exit);

    const { paths, writeTemplate } = require("../template.js");
    const result = writeTemplate();

    expect(result).toBe(true);
    expect(readFileSync).toHaveBeenCalledWith(paths.source, "utf8");
    expect(mkdirSync).toHaveBeenCalledWith(paths.targetDir, {
      recursive: true,
    });
    expect(writeFileSync).toHaveBeenCalledWith(paths.target, "<html />");
    expect(log).toHaveBeenCalledWith(
      `Wrote Linklog template to ${paths.target}`,
    );
    expect(exit).not.toHaveBeenCalledWith(1);

    console.log.mockRestore();
    console.error.mockRestore();
    process.exit.mockRestore();
    jest.dontMock("fs");
    jest.resetModules();
  });

  it("logs and exits on failure", () => {
    const log = jest.fn();
    const error = jest.fn();
    const exit = jest.fn();
    const readFileSync = jest.fn(() => {
      throw new Error("boom");
    });
    const mkdirSync = jest.fn();
    const writeFileSync = jest.fn();

    jest.resetModules();
    jest.doMock("fs", () => ({
      readFileSync,
      mkdirSync,
      writeFileSync,
    }));
    jest.spyOn(console, "log").mockImplementation(log);
    jest.spyOn(console, "error").mockImplementation(error);
    jest.spyOn(process, "exit").mockImplementation(exit);

    const { writeTemplate } = require("../template.js");
    const result = writeTemplate();

    expect(result).toBe(false);
    expect(error).toHaveBeenCalledWith(
      "Failed to export Linklog template: boom",
    );
    expect(exit).toHaveBeenCalledWith(1);
    expect(writeFileSync).not.toHaveBeenCalled();

    console.log.mockRestore();
    console.error.mockRestore();
    process.exit.mockRestore();
    jest.dontMock("fs");
    jest.resetModules();
  });
});
