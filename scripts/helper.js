const post = async ( url, data = null, callback ) => {
  const res = await fetch( url, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( data ),
    method: 'POST'
  })

  return callback( res )
}

const get = async ( url, parameters ) => {
  let parametersStr = ''
  Object.entries( parameters ).forEach( ([key, value], index) => {
    if( index === 0 ) parametersStr += `${ key }=${ value }` 
    else parametersStr += `&${ key }=${ value }` 
  })

  const res = await fetch(`${url}?${parametersStr}`)
  return await res.json()
}

export { post, get }