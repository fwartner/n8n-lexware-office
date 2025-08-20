import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LexwareOfficeApi implements ICredentialType {
	name = 'lexwareOfficeApi';
	displayName = 'Lexware Office API';
	documentationUrl = 'https://developers.lexware.io/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for Lexware Office',
		},
		{
			displayName: 'Resource URL',
			name: 'resourceUrl',
			type: 'string',
			default: 'https://api.lexware.io',
			required: true,
			description: 'The resource URL for the Lexware API (usually https://api.lexware.io)',
		},
	];
}
