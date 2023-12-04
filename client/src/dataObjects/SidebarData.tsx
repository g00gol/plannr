
export class SidebarData {
    constructor(
        public title : string,
        public desc : string,
        public addr : string,
        public isOpen : boolean
    ) {
        this.title = title;
        this.desc = desc;
        this.addr = addr;
        this.isOpen = isOpen;
    }

    public getOpenStr() {
        return this.isOpen ? "Open" : "Closed";
    }
}