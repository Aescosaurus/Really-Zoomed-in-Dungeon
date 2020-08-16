class Pickup
{
	// use -1 for random (no type)
	constructor( tilemap,type,tier = 0 )
	{
		const randPos = tilemap.GetRandTile()
		this.x = randPos.x
		this.y = randPos.y
		
		this.item = Pickup.GenerateItem( -1,tier )
		
		this.tilemap = tilemap
	}
	
	Draw( cam )
	{
		// cam.Draw( this.x,this.y,"yellow" )
		// cam.DrawSpr( this.x,this.y,Pickup.boxSpr,"yellow" )
		cam.DrawSpr( this.x,this.y,this.item.spr,"#DEEEFF",{ x: 4,y: 4 } )
	}
}

Pickup.boxSpr = new Sprite( "Images/Pickup" )
Pickup.items =
[
	new Item( 1,1,1,new Sprite( "Images/Armor" ) ),
	new Item( 2,1,1,new Sprite( "Images/Fruit" ) )
]
Pickup.itemsT2 =
[
	new Item( 1,2,1,new Sprite( "Images/Armor2" ) ),
	new Item( 2,2,1,new Sprite( "Images/Fruit2" ) )
]
Pickup.itemsT3 =
[
	new Item( 1,3,1,new Sprite( "Images/Armor3" ) ),
	new Item( 2,3,1,new Sprite( "Images/Fruit3" ) )
]

Pickup.GenerateItem = function( type,tier )
{
	let item = null
	// do
	{
		if( tier == 0 )
		{
			item = Pickup.items[Random.Range( 0,Pickup.items.length - 1 )]
		}
		else if( tier == 1 )
		{
			item = Pickup.itemsT2[Random.Range( 0,Pickup.itemsT2.length - 1 )]
		}
		else
		{
			item = Pickup.itemsT3[Random.Range( 0,Pickup.itemsT3.length - 1 )]
		}
	}
	// while( item.type != type && type >= 0 )
	
	return( item )
}