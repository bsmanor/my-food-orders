export class Order {
    constructor(
        public $key: string,
        public name: string,
        public restName: string,
        public hourOfOrder: string,
        public joined = [],
        public arrived: boolean,
        public orderSent: boolean,
        public status: string,
        public date: string,
        public viewJoined: boolean
    ) {}
}