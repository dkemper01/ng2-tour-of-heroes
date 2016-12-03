export class Hero {
	
	public alterEgo: string;
	
	constructor(
    public id: number,
    public name: string,
    public power: string,
		altIdentity?: string
  ) { 
		this.alterEgo = altIdentity;
	}
	
};