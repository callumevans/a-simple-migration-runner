import {AdapterFactory} from "../adapter";
import {AsmrError, AsmrLog, AsmrSuccess} from "../logging";
import {InitResult, InitResultType} from "../adapters/results/init-result";

export async function Init() {
    const adapter = await AdapterFactory();

    try {
        const initResult: InitResult =  await adapter.Init();

        switch (initResult.result) {
            case InitResultType.Initialised:
                AsmrSuccess('Successfully initialised asmr');
                break;
            case InitResultType.AlreadyExists:
                AsmrLog('asmr already initialised');
                break;
            case InitResultType.Error:
                AsmrError('Error initialising asmr');
                AsmrError(initResult.error);
                break;
        }
    } finally {
        await adapter.Close();
    }
}
