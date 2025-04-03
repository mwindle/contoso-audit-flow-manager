
import { 
    DataSourceType, 
    IDataSourcesProps, 
    IconName, 
    IconStyle, 
    IThemeOptions 
} from '@microsoft/sharepointembedded-copilotchat-react';

export class ChatController {
    public static readonly instance = new ChatController();
    private constructor() { }

/*
    public get dataSources(): IDataSourcesProps[] {
        const sources: IDataSourcesProps[] = [];

        for (const container of this._selectedContainers) {
            if (!container || !container.drive) {
                continue;
            }
            sources.push({
                type: DataSourceType.DocumentLibrary,
                value: {
                    name: container.displayName,
                    url: container.drive!.webUrl
                }
            });
        }

        return sources;
    }
    private _dataSourceSubscribers: ((dataSources: IDataSourcesProps[]) => void)[] = [];
    public addDataSourceSubscriber(subscriber: (dataSources: IDataSourcesProps[]) => void) {
        this._dataSourceSubscribers.push(subscriber);
    }
    public removeDataSourceSubscriber(subscriber: (dataSources: IDataSourcesProps[]) => void) {
        this._dataSourceSubscribers = this._dataSourceSubscribers.filter(s => s !== subscriber);
    }

    private _selectedContainers: IContainer[] = [];
    public get selectedContainers(): IContainer[] {
        return this._selectedContainers;
    }
    public set selectedContainers(value: IContainer[]) { console.log(value);
        this._selectedContainers = value;
        this._dataSourceSubscribers.forEach(subscriber => subscriber(this.dataSources));
    }
*/

    public readonly header = "SharePoint Embedded Chat";
    public readonly theme: IThemeOptions = {
        useDarkMode: false,
        customTheme: {
            themePrimary: '##1E3A8A',
            themeSecondary: '##1E3A8A',
            themeDark: '##1E3A8A',
            themeDarker: '##1E3A8A',
            themeTertiary: '##1E3A8A',
            themeLight: '#dddeef',
            themeDarkAlt: '##1E3A8A',
            themeLighter: '#dddeef',
            themeLighterAlt: '#dddeef',
            themeDarkAltTransparent: '##1E3A8A',
            themeLighterTransparent: '#dddeef',
            themeLighterAltTransparent: '#dddeef',
            themeMedium: '##1E3A8A',
            neutralSecondary: '##1E3A8A',
            neutralSecondaryAlt: '##1E3A8A',
            neutralTertiary: '##1E3A8A',
            neutralTertiaryAlt: '##1E3A8A',
            neutralQuaternary: '##1E3A8A',
            neutralQuaternaryAlt: '##1E3A8A',
            neutralPrimaryAlt: '##1E3A8A',
            neutralDark: '##1E3A8A',
            themeBackground: 'white',
        }
    };

    public getPrompts(): PromptSuggestions {
        return {
            headerText: `What do you want to know about?`,
            promptSuggestionList: [
                {
                    suggestionText: 'Show me recent files',
                    iconRegular: { name: IconName.ChatBubblesQuestion, style: IconStyle.Regular },
                    iconHover: { name: IconName.ChatBubblesQuestion, style: IconStyle.Filled },
                },
                {
                    suggestionText: "What is the SharePoint Embedded copilot agent?",
                    iconRegular: { name: IconName.Search, style: IconStyle.Regular },
                    iconHover: { name: IconName.Search, style: IconStyle.Filled },
                },
                {
                    suggestionText: "Make a table of marketing expenses over the past five years",
                    iconRegular: { name: IconName.DocumentCatchUp, style: IconStyle.Regular },
                    iconHover: { name: IconName.DocumentCatchUp, style: IconStyle.Filled },
                }
            ]
        }
    }

    public readonly suggestedPrompts = [
        "List and summarize recent files",
    ];

    public readonly pirateMetaPrompt = "Response must be in the tone of a pirate. Yarrr!";

    public readonly locale = "en";
}

type PromptSuggestions = {
    headerText: string;
    promptSuggestionList: {
        suggestionText: string;
        iconRegular: { name: IconName; style: IconStyle };
        iconHover: { name: IconName; style: IconStyle };
    }[];
}
