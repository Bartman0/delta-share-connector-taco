import Connector from '@tableau/taco-toolkit'
import * as ds from 'delta-sharing'


let connectorInitialized = false
let pageLoaded = false

const connector = new Connector(() => {
  connectorInitialized = true
  enableButtonWhenReady()
})

function submit() {
  const connection_profile = document.getElementById('connection_profile').value
  if (!connection_profile) {
    return
  }
  console.log(`Connection profile selected: ${connection_profile}`)

  const sharingProfile = ds.DeltaSharingProfile.readFromFile('/Users/richardkooijman/Downloads/config.share')
  //const client = new SharingClient(sharingProfile)
  //const restClient = new DataSharingRestClient(sharingProfile)

  //connector.handleInputs = client.listAllTablesAsync().then(function(tables) {
  //  console.log('Listing tables...')
  //  tables.map(function(table) {
  //    console.log(`table: ${table.toString()}`)
  //    const fullTableName = `${table.schema}.${table.tableName}`

  //    urls = restClient.listFilesInTable(table).then(function(files) {
  //        return files.addFiles.map((file) => file.url)
  //    })
  //    return {
  //      fetcher: 'DeltaShareFetcher',
  //      parser: 'taco:parquet-file-parser',
  //      name: fullTableName,
  //      data: {
  //        urls: urls,
  //      }
  //    }
  //  })
  //})

  connector.submit()
}

function handleSubmit() {
  const button = getSubmitButton()

  button.toggleAttribute('disabled')
  button.innerText = 'Processing...'

  submit()
}

function enableButtonWhenReady() {
  if (connectorInitialized && pageLoaded) {
    const button = getSubmitButton()

    button.innerText = ' Get Data! '
    button.removeAttribute('disabled')
    button.addEventListener('click', handleSubmit, { once: true })

    button.focus()
  }
}

function getSubmitButton() {
  const button = document.getElementById('submitButton')
  if (!button) {
    throw new Error('Submit button is not present on the page.')
  }
  return button
}

window.addEventListener('load', function () {
  pageLoaded = true
  enableButtonWhenReady()

  document.getElementById('connection_profile').addEventListener('cancel', function (e) {
    console.log("File input cancelled.")
    this.value = null
  }, false)

  document.getElementById('connection_profile').addEventListener('change', function (e) {
    console.log("File selected: ", e.target.files[0].name);
    enableButtonWhenReady()
  }, false)
})

