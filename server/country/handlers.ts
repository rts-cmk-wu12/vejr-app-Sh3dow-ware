import { capitals } from "./capitals";
import { nameToCode } from "./nameToCode";

export function getCountryName(input: string): string | null {
    const code = input.length === 2
        ? input.toUpperCase()
        : nameToCode[input.toLowerCase()];

    console.log("Input:", input);
    console.log("Resolved Code:", code);
    console.log("Country Lookup:", capitals[code]);

    return capitals[code] || null;
}
