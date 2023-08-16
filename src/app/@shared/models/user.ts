export class JarvisUser {
    accessToken: string | undefined;
    displayName: string | undefined;
    email: string | undefined;
    uid: string | undefined;
    photoURL: string | undefined;
    // has more stuff but this is the only important stuff

    constructor (src: any) {
        Object.assign(this, src);
    }
}