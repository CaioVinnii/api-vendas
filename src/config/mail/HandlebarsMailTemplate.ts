import handleBars from "handlebars";
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
};

class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });

    const parseTemplate = handleBars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;