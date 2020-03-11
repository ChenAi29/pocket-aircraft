import { NodeNameEnum } from "../const/NodeNameEnum";
import { PrefabPathEnum } from "../const/ResPathEnum";
import { PoolEnum } from "../const/PoolEnum";
import { Role } from "../entity/role/Role";
import { GameZOrderEnum } from "../const/ZOrderEnum";
import { RoleData } from "../data/RoleData";

/*
 * @Author: FeiFan Chen 
 * @Date: 2019-12-27 09:12:43 
 * @Last Modified by: XiongZhiCheng
 * @Last Modified time: 2020-03-11 23:39:59
 */
export class GameSpawner {

    private _gameRoot: cc.Node = null;

    public constructor() {
        let canvas = cc.Canvas.instance.node;
        let gameRoot = canvas.getChildByName(NodeNameEnum.GAME_ROOT);
        if (!gameRoot) {
            console.error('can not find game root');
            return;
        }
        this._gameRoot = gameRoot;
    }

    public spawnPlayer(pos: cc.Vec2): Role {
        if (!this._gameRoot) return null;
        let resMgr = appContext.resourcesManager;
        let rolePrefab = resMgr.getPrefab(PrefabPathEnum.ROLE);
        if (!rolePrefab) return null;
        let poolMgr = appContext.poolManager;
        let roleNode = poolMgr.get(PoolEnum.ROLE, rolePrefab);
        if (!roleNode) return null;
        roleNode.position = pos;
        roleNode.zIndex = GameZOrderEnum.ROLE;
        this._gameRoot.addChild(roleNode);
        let roleComp = roleNode.getComponent(Role);
        return roleComp;
    }

    public spawnEnemy(roleData: RoleData): Role {
        if (!this._gameRoot) return null;
        let resMgr = appContext.resourcesManager;
        let path = roleData.id < 10 ? '0' + roleData.id : roleData.id;
        let rolePrefab = resMgr.getPrefab(PrefabPathEnum.ROLE + path);
        if (!rolePrefab) return null;
        let poolMgr = appContext.poolManager;
        let roleNode = poolMgr.get(PoolEnum.ROLE, rolePrefab);
        if (!roleNode) return null;
        roleNode.position = roleData.pos;
        roleNode.zIndex = GameZOrderEnum.ROLE;
        this._gameRoot.addChild(roleNode);
        let roleComp = roleNode.getComponent(Role);
        return roleComp;
    }

    public spawnFireRocket(userX: number, attackerId: number, roadNo: number): void {

    }

    public spawnLandEffect(pos: cc.Vec2, roadY: number): void {
        if (!this._gameRoot) return;
        let resMgr = appContext.resourcesManager;
        let landPrefab = resMgr.getPrefab(PrefabPathEnum.LAND);
        if (!landPrefab) return;
        let landNode = appContext.poolManager.get(PoolEnum.LAND, landPrefab);
        if (!landNode) return;
        landNode.position = pos;
        landNode.zIndex = -roadY;
        this._gameRoot.addChild(landNode);
    }

}