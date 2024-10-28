import { Platform, PlatformInterceptorBuilder } from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem"
import { PettyCashService } from "./petty-cash";


const platformSession = await Platform.builder()
    .withInterceptors((i:PlatformInterceptorBuilder) => {
        PettyCashService().setup(i)
    })
    .build()

export const dispatcher =  platformSession.asSolution("21e1b2f2-73f1-4890-82ab-ff3df8b6c449");


    
//export const dispatcher = platformSession.asSolution("21e1b2f2-73f1-4890-82ab-ff3df8b6c449");

//  Basic usage:
//     const result = await dispatcher.request(MyEndpoint.with(new MyEndpointInput()));