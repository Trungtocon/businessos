// V2.4 AI Copilot — Provider Interface

import type { ModuleType, ModuleResult } from "../types";

export interface AIProviderConfig {
    apiKey?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
}

export interface AIProviderRequest {
    moduleType: ModuleType;
    prompt: string;
    config?: AIProviderConfig;
}

export interface AIProviderResponse {
    raw: string;
    parsed: ModuleResult;
    tokenUsage?: {
        prompt: number;
        completion: number;
        total: number;
    };
}

export interface AIProvider {
    name: string;
    generate(request: AIProviderRequest): Promise<AIProviderResponse>;
}
