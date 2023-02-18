const post = async ( url, data = null, callback, ct = 'application/json' ) => {
  const res = await fetch( url, {
    headers: { 'Content-Type': ct },
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