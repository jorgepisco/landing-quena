import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// const apigClientFactory = require('aws-api-gateway-client').default;
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuenaService {

  constructor() { }

  public async invokePostService(apigClientFactory: any, request: any, pathUrl: any): Promise<any> {
    
    return new Promise(async(resolve, reject)=> {
      let result: any;
      const apigClient = apigClientFactory.newClient({
        invokeUrl: environment.baseUrl,
        accessKey: environment.accessKey,
        secretKey: environment.secretKey,
        region: environment.region
      });

      const pathParams = {};
      const pathTemplate = pathUrl;
      const method = 'POST';
      const additionalParams = {
          headers: {},
          queryParams: {},
      };

      result = await apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, request);
      return resolve(result);
    });
    
  }
}
