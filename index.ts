import { LexwareOfficeNode } from './nodes/LexwareOffice/LexwareOffice.node';
import { LexwareOfficeTriggerNode } from './nodes/LexwareOffice/LexwareOfficeTrigger.node';
import { LexwareOfficeApi } from './credentials/LexwareOfficeApi.credentials';

export const nodes = [
	LexwareOfficeNode,
	LexwareOfficeTriggerNode,
];

export const credentials = [
	LexwareOfficeApi,
];
