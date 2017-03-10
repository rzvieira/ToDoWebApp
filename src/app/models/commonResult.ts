export class CommonSimpleResult{
    public errors: string[];
    public success: boolean;
}

export class CommonResult<TResult> extends CommonSimpleResult{
    public result: TResult;
}