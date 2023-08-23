import { Generic } from "./_generic.model";

export class JarvisUser extends Generic  {
    accessToken: string | undefined;
    displayName: string | undefined;
    email: string | undefined;
    uid: string | undefined;
    photoURL: string | undefined;
    // has more stuff but this is the only important stuff

}