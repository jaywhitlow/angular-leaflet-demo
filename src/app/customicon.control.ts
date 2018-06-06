import { DivIcon, BaseIconOptions, PointExpression } from "leaflet";

export function customIcon(options: CustomIconOptions): CustomIcon {
    return new CustomIcon(options);
}

/**
 * Simple extension class of DivIcon for easily using a library like FontAwesome along with
 * different icon/marker colors and shapes
 * 
 * If we wanted to use this in production, this class would need a bit more lovin', specifically
 * support for anchor/icon positioning, and support for leaflet tooltips/popups, etc. ( potentially an NgZone issue? )
 * 
 */
export class CustomIcon extends DivIcon {
    options: CustomIconOptions;

    constructor(iconOptions: CustomIconOptions){
        super();
        this.options = iconOptions;

        this.options.containerColor = this.options.containerColor || "red";
        this.options.iconColor = this.options.iconColor || "white";
        this.options.iconFontSize = this.options.iconFontSize || 17;
    }

    createIcon(oldIcon: HTMLElement): HTMLElement {
        const baseContainerElement = document.createElement('div');
        const pinContainerElement = document.createElement('div');

        if (this.options.containerType === CustomIconContainerType.GpsMarker) {        
            pinContainerElement.setAttribute("style", "background: " + this.options.containerColor + "; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; position: absolute; -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -o-transform: rotate(-45deg); -ms-transform: rotate(-45deg); transform: rotate(-45deg); left: 50%; top: 50%; margin: -20px 0 0 -20px;");
        } else {
            pinContainerElement.setAttribute("style", "background: " + this.options.containerColor + "; width: 30px; height: 30px; position: absolute; border: 1px solid #000;");
        }

        if (this.options.iconName) {
            const iconContainerElement = document.createElement('i');
            const positioning = this.options.containerType == CustomIconContainerType.GpsMarker ? "top: -14px; left: -13px" : "top: 6px; left: 6px";

            iconContainerElement.setAttribute("class", "fas fa-" + this.options.iconName);
            iconContainerElement.setAttribute("style", "color: " + this.options.iconColor + "; font-size: 17px; z-index: 1; position: absolute;" + positioning);
            baseContainerElement.appendChild(iconContainerElement);
        }

        baseContainerElement.appendChild(pinContainerElement);

        return baseContainerElement;
    }
}

export class CustomIconOptions implements BaseIconOptions {
    containerType: CustomIconContainerType;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    tooltipAnchor?: PointExpression;
    containerColor?: string;
    iconName?: string | false;
    iconColor?: string;
    iconFontSize?: number;
    extraIconClasses?: string | false;
}

export enum CustomIconContainerType {
    GpsMarker,
    Box
}
    