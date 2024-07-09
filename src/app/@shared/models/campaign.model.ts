import { Generic } from "./_generic.model";

export class Campaign extends Generic {
    name: string | undefined;
    uid: string | undefined;
    dmID: string | undefined;
    playerIDs: string[] | undefined;
    passcode: string | undefined;
}