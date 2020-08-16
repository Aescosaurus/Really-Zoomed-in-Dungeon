class BossFinal extends Monster
{
	constructor( tilemap )
	{
		super( tilemap,
		[
			new Sprite( "Images/BossFinal0" ),
			new Sprite( "Images/BossFinal1" ),
			new Sprite( "Images/BossFinal2" ),
			new Sprite( "Images/BossFinal3" ),
		] )
		this.hp = 13
		this.boss = true
		
		this.x = tilemap.bossPos.x
		this.y = tilemap.bossPos.y
	}
	
	GenerateItem( player,curLevel )
	{
		return( BossFinal.items[player.myClass][Random.Range( 0,BossFinal.items[player.myClass].length - 1 )] )
	}
}

BossFinal.items =
[
	[
		new Item( 3,3,5,new Sprite( "Images/Blank" ) )
	],
	[
		new Item( 3,2.5,5,new Sprite( "Images/Blank" ) )
	],
	[
		new Item( 3,1.8,5,new Sprite( "Images/Blank" ) )
	]
]