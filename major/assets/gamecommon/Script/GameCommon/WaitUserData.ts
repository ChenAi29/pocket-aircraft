import { UserData } from "./UserData";
import { WorldEventManager } from "./WorldEventManager";
import { WorldEventType } from "./WorldEventType";
import { MoreGameManager } from "../MoreGame/MoreGameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export class WaitUserData extends cc.Component {

    protected runTime: number = 0;

    update(dt: number): void {

        this.runTime += dt;

        //5秒后自动超时结束转圈
        if (this.runTime >= 5 || cc.sys.browserType) {
            MoreGameManager.initMoreGameConfig();
            MoreGameManager.initHorizontalConfig();
            UserData.init = true;
            WorldEventManager.triggerEvent(WorldEventType.GetUserDataFinish, null);
            this.node.active = false;
            return;
        }

        if (!UserData.init) {
            return;
        }
        MoreGameManager.initMoreGameConfig();
        MoreGameManager.initHorizontalConfig();
        WorldEventManager.triggerEvent(WorldEventType.GetUserDataFinish, null);
        this.node.active = false;
    }
}