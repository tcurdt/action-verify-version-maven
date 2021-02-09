const core = require('@actions/core')
const fs = require('fs')

function parseStringSync(str) {
  let result
  new require('xml2js').Parser().parseString(str, (e, r) => { result = r })
  return result
}

function extractVersion(file) {

  const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'})

  const pom = parseStringSync(data)

  const version = pom?.project?.version

  return version
}

try {

  const ref = process.env['GITHUB_REF']
  console.log(`ref: [${ref}]`)

  const file = core.getInput('file') || './pom.xml'
  console.log(`file: [${file}]`)

  const prefix = core.getInput('prefix') || 'refs/tags/v'
  console.log(`prefix: [${prefix}]`)

  const version_from_package = extractVersion(file)
  console.log(`version from pom: [${version_from_package}]`)

  core.setOutput('version', version_from_package)

  if (ref.startsWith(prefix)) {

    const version_from_tag = ref.substring(prefix.length)
    console.log(`version from tag: [${version_from_tag}]`)

    if (version_from_package != version_from_tag) {
      core.setFailed(`pom version [${version_from_package}] != tag version [${version_from_tag}]`)
    }

  } else {
    console.log(`no tag`)
  }

} catch (error) {
  core.setFailed(error.message);
}
