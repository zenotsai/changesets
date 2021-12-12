import { PackageJSON } from "@changesets/types";

export const getPkgJsonVersion = (packageJson: PackageJSON): string => {
  if (packageJson.version === undefined) {
    return "0.0.0";
  }
  if (typeof packageJson.version === "string") {
    return packageJson.version;
  }
  throw new Error(
    `Package "${packageJson.name}" has invalid version property: ${packageJson.version}.`
  );
};
