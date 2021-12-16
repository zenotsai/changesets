import { PackageGroup, VersionType } from "@changesets/types";
import { Package } from "@manypkg/get-packages";
import semver from "semver";
import { InternalRelease } from "./types";

export function getHighestReleaseType(
  releases: InternalRelease[]
): VersionType {
  if (releases.length === 0) {
    throw new Error(
      `Large internal changesets error in calculating when calculating highest release type in the set of releases. Please contact the maintainers`
    );
  }

  let highestReleaseType = releases[0].type;

  for (let release of releases) {
    switch (release.type) {
      case "major":
        return "major";
      case "minor":
        highestReleaseType = "minor";
        break;
      // patch never needs to override another value
    }
  }

  return highestReleaseType;
}

export function getCurrentHighestVersion(
  packageGroup: PackageGroup,
  packagesByName: Map<string, Package>
): string {
  let highestVersion: string | undefined;

  for (let pkgName of packageGroup) {
    let pkg = packagesByName.get(pkgName);

    if (!pkg) {
      console.error(
        `FATAL ERROR IN CHANGESETS! We were unable to version for package group: ${pkgName} in package group: ${packageGroup.toString()}`
      );
      throw new Error(`fatal: could not resolve linked packages`);
    }

    if (
      highestVersion === undefined ||
      semver.gt(pkg.packageJson.version, highestVersion)
    ) {
      highestVersion = pkg.packageJson.version;
    }
  }

  return highestVersion!;
}