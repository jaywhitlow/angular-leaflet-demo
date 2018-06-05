import { DivIcon, DivIconOptions } from "leaflet";

export function fontAwesomeIcon(options: FontAwesomeIconOptions): FontAwesomeIcon{
    return new FontAwesomeIcon(options);
}

export class FontAwesomeIcon extends DivIcon {
    options: FontAwesomeIconOptions;

    constructor(iconOptions: FontAwesomeIconOptions){
        super();
        this.options = iconOptions;
    }

    createIcon(oldIcon: HTMLElement): HTMLElement {
        let baseContainerElement = document.createElement('div');
        let pinContainerElement = document.createElement('div');
        let iconContainerElement = document.createElement('i');

        if(this.options.containerType === "marker"){        
            pinContainerElement.setAttribute("style", "background: " + this.options.containerColor + "; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; position: absolute; -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -o-transform: rotate(-45deg); -ms-transform: rotate(-45deg); transform: rotate(-45deg); left: 50%; top: 50%; margin: -20px 0 0 -20px;");
        }
        else {
            pinContainerElement.setAttribute("style", "background: " + this.options.containerColor + "; width: 30px; height: 30px;");
        }

        if(this.options.html){
            pinContainerElement.innerHTML = this.options.html;
        }
        else {
            iconContainerElement.setAttribute("class", "fas fa-" + this.options.iconName);
            iconContainerElement.setAttribute("style", "color: " + this.options.iconColor + "; font-size: 17px; position: absolute; top: -14px; left: -13px; z-index: 1");
        }

        baseContainerElement.appendChild(iconContainerElement);
        baseContainerElement.appendChild(pinContainerElement);

        return baseContainerElement;
    }
}

export class FontAwesomeIconOptions implements DivIconOptions {
    html?: string | false;
    containerType?: string;
    containerColor?: String;
    iconName?: string;
    iconColor?: string;
    iconFontSize?: number;
    extraIconClasses?: string;
}

    