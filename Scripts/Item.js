class Item
{
	// type 0=weapon, 1=armor, 2=food/hp
	// power = weapon damage, armor amount, food effectiveness
	constructor( type,pow,uses,spr )
	{
		this.type = type
		this.pow = pow
		this.uses = uses
		this.spr = spr
	}
	
	Draw( x,y,gfx )
	{
		gfx.DrawSprite( x,y,this.spr )
	}
}