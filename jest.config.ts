import type { Config } from "jest";

const config: Config = {
    verbose: true,
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;