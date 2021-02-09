# Verify Package Version (maven)

Verifies that the pom version matches the current tag.

## Inputs

### `file`

Path to the package descriptor. Default `./pom.xml`.

### `prefix`

Ref prefix. Default `refs/tags/v`.

## Outputs

### `version`

The version from the pom.

## Example usage

    uses: tcurdt/action-verify-version-maven@master
