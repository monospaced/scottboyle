const { paths, writeTemplate } = require("../template.js");

describe("template script", () => {
  it("writes the template file", () => {
    const fsModule = {
      readFileSync: jest.fn().mockReturnValue("<html />"),
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn(),
    };
    const consoleModule = { log: jest.fn(), error: jest.fn() };
    const exit = jest.fn();

    const result = writeTemplate({ fsModule, consoleModule, exit });

    expect(result).toBe(true);
    expect(fsModule.readFileSync).toHaveBeenCalledWith(paths.source, "utf8");
    expect(fsModule.mkdirSync).toHaveBeenCalledWith(paths.targetDir, {
      recursive: true,
    });
    expect(fsModule.writeFileSync).toHaveBeenCalledWith(
      paths.target,
      "<html />",
    );
    expect(consoleModule.log).toHaveBeenCalledWith(
      `Wrote Linklog template to ${paths.target}`,
    );
    expect(exit).not.toHaveBeenCalled();
  });

  it("logs and exits on failure", () => {
    const fsModule = {
      readFileSync: jest.fn(() => {
        throw new Error("boom");
      }),
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn(),
    };
    const consoleModule = { log: jest.fn(), error: jest.fn() };
    const exit = jest.fn();

    const result = writeTemplate({ fsModule, consoleModule, exit });

    expect(result).toBe(false);
    expect(consoleModule.error).toHaveBeenCalledWith(
      "Failed to export Linklog template: boom",
    );
    expect(exit).toHaveBeenCalledWith(1);
    expect(fsModule.writeFileSync).not.toHaveBeenCalled();
  });
});
