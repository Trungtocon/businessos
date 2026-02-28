// ERPNext Connector — Action Store
// In-memory store for ERP actions. In production, replace with DB.

import type { ErpAction } from "./types";

const actionStore = new Map<string, ErpAction>();

/** Register an action. */
export function registerAction(action: ErpAction) {
    actionStore.set(action.id, action);
}

/** Get action by ID. */
export function getAction(id: string): ErpAction | undefined {
    return actionStore.get(id);
}

/** Update action in store. */
export function updateAction(id: string, patch: Partial<ErpAction>) {
    const action = actionStore.get(id);
    if (action) {
        actionStore.set(id, { ...action, ...patch, updatedAt: new Date().toISOString() });
    }
}

/** List all actions. */
export function listActions(): ErpAction[] {
    return Array.from(actionStore.values());
}
