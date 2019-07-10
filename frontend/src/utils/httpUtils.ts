const JSON_HEADER = 'application/json';

const getRequestParams = ( method: string, additionalHeaders: HeadersInit = {} ) => {
  return {
    credentials: 'include',
    headers: {
      'Accept': JSON_HEADER,
      'Content-Type': JSON_HEADER,
      ...additionalHeaders
    },
    method,
  } as RequestInit;
};

const getJson = ( url: string, additionalHeaders?: HeadersInit ) => {
  return fetch( url, {
    ...getRequestParams( 'GET', additionalHeaders ),
  } ).then( processResponse );
};

const postJson = ( url: string, data: any, additionalHeaders?: HeadersInit ) => {
  return fetch( url, {
    ...getRequestParams( 'POST', additionalHeaders ),
    body: JSON.stringify( data )
  } ).then( processResponse );
};

const putJson = ( url: string, data: any, additionalHeaders?: HeadersInit ) => {
  return fetch( url, {
    ...getRequestParams( 'PUT', additionalHeaders ),
    body: JSON.stringify( data )
  } ).then( processResponse );
};

const processResponse = ( response: Response ) =>
  response.json().then( ( res ) => {
    if (!response.ok) {
      throw res;
    }
    return res;
  } );

export {
  getJson,
  postJson,
  putJson,
};
