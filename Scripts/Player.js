class Player
{
	constructor( tilemap,inv,heartBar )
	{
		this.x = tilemap.playerPos.x
		this.y = tilemap.playerPos.y
		
		// this.moveTimer = 0
		// this.moveInterval = 20
		
		this.tilemap = tilemap
		this.inv = inv
		this.heartBar = heartBar
		
		this.sprs =
		[
			[
				new Sprite( "Images/Player0" ),
				new Sprite( "Images/Player1" ),
				new Sprite( "Images/Player2" ),
				new Sprite( "Images/Player3" )
			],
			[
				new Sprite( "Images/Mage0" ),
				new Sprite( "Images/Mage1" ),
				new Sprite( "Images/Mage2" ),
				new Sprite( "Images/Mage3" )
			],
			[
				new Sprite( "Images/Rogue0" ),
				new Sprite( "Images/Rogue1" ),
				new Sprite( "Images/Rogue2" ),
				new Sprite( "Images/Rogue3" )
			]
		]
		this.dir = Random.Range( 0,3 )
		
		this.flashing = false
		this.flashTimer = 0
		this.flashInterval = 30
		
		this.myClass = 0
		
		this.turn = 0
		
		this.mageCritChance = 45
	}
	
	Update( kbd,monsters,pickups,animHand )
	{
		// if( ++this.moveTimer > this.moveInterval )
		{
			let xMove = 0
			let yMove = 0
			let itemUse = -1
			if( kbd.KeyDown( 'W' ) )
			{
				--yMove
				this.dir = 0
			}
			else if( kbd.KeyDown( 'S' ) )
			{
				++yMove
				this.dir = 1
			}
			else if( kbd.KeyDown( 'A' ) )
			{
				--xMove
				this.dir = 2
			}
			else if( kbd.KeyDown( 'D' ) )
			{
				++xMove
				this.dir = 3
			}
			
			for( let i = 0; i < 9; ++i )
			{
				if( kbd.KeyDown( 48 + i ) ) itemUse = i
			}
			
			if( ++this.flashTimer > this.flashInterval )
			{
				this.flashing = !this.flashing
				this.flashTimer = 0
			}
			
			if( ( xMove != 0 || yMove != 0 ) &&
				this.tilemap.GetTile( this.x + xMove,this.y + yMove ) < 1 )
			{
				this.flashing = true
				
				const monsterIndex = this.IsNextToAMonster( monsters )
				if( monsterIndex < 0 ||
					this.x + xMove != monsters[monsterIndex].x ||
					this.y + yMove != monsters[monsterIndex].y )
				{
					this.x += xMove
					this.y += yMove
					Player.footstepSound.Play()
					
					for( let i = 0; i < pickups.length; ++i )
					{
						if( pickups[i].type == 0 )
						{
							this.inv.AddItem( pickups[i].item )
						}
					}
					
					for( let i = 0; i < pickups.length; ++i )
					{
						if( pickups[i].x == this.x && pickups[i].y == this.y &&
							pickups[i].item.type < 3 )
						{
							if( this.inv.AddItem( pickups[i].item ) )
							{
								if( pickups[i].item.type == 2 ) Player.pickupFoodSound.Play()
								else if( pickups[i].item.type == 1 ) Player.pickupArmorSound.Play()
								else Player.pickupWeaponSound.Play()
								pickups.splice( i,1 )
								i = 0
							}
						}
					}
					
					return( true )
				}
			}
			else if( itemUse > 0 )
			{
				const item = this.inv.GetItem( itemUse - 1 )
				
				if( item )
				{
					if( item.type == 0 )
					{
						const monsterIndex = this.IsNextToAMonster( monsters )
						if( monsterIndex >= 0 )
						{
							const curMonster = monsters[monsterIndex]
							curMonster.Damage( item.pow )
							Player.attackSound.Play()
							if( this.myClass == 1 && Random.Range( 0,100 ) < this.mageCritChance )
							{
								curMonster.Damage( item.pow )
							}
							if( curMonster.y < this.y ) this.dir = 0
							else if( curMonster.y > this.y ) this.dir = 1
							else if( curMonster.x < this.x ) this.dir = 2
							else if( curMonster.x > this.x ) this.dir = 3
							const xAdd = this.dir > 1 ? Math.floor( this.dir * 2 - 5 ) : 0
							const yAdd = this.dir < 2 ? Math.floor( this.dir * 2 - 1 ) : 0
							animHand.SpawnAnim(
								this.tilemap.tileSize + xAdd * this.tilemap.tileSize / 2,
								this.tilemap.tileSize + yAdd * this.tilemap.tileSize / 2,
								0 )
							// --item.uses
						}
					}
					else if( item.type == 1 )
					{
						if( this.heartBar.AddArmor( item.pow ) )
						{
							// --item.uses
							this.inv.items[itemUse - 1] = null
							Player.armorSound.Play()
						}
					}
					else if( item.type == 2 )
					{
						if( this.heartBar.AddHP( item.pow ) )
						{
							// --item.uses
							this.inv.items[itemUse - 1] = null
							Player.hpSound.Play()
						}
					}
					
					// if( /*item.uses < uses && */item.uses < 1 && item.type != 0 )
					// {
					// 	// let canDelete = false
					// 	// for( let i in this.inv.items )
					// 	// {
					// 	// 	if( this.inv.items[i] &&
					// 	// 		this.inv.items[i].type == 0 &&
					// 	// 		i != itemUse - 1 )
					// 	// 	{
					// 	// 		canDelete = true
					// 	// 		break
					// 	// 	}
					// 	// }
					// 	// 
					// 	// if( canDelete )
					// 	{
					// 		this.inv.items[itemUse - 1] = null
					// 	}
					// }
					
					return( true )
				}
			}
		}
		
		return( false )
	}
	
	Draw( cam )
	{
		// gfx.DrawRect( 16,16,16,16,"blue" )
		
		// gfx.DrawRect( Math.floor( this.x ) + 48,Math.floor( this.y ),
		// 	1,1,"blue" )
		
		// this.tilemap.DrawTile( this.x,this.y,"blue",gfx )
		
		cam.DrawSpr( this.x,this.y,this.sprs[this.myClass][this.dir],
			( this.flashing ? "#556D89" : "#FACACA" ) )
	}
	
	IsNextToAMonster( monsters )
	{
		for( let i in monsters )
		{
			const xDiff = Math.abs( monsters[i].x - this.x )
			const yDiff = Math.abs( monsters[i].y - this.y )
			if( xDiff + yDiff == 1 )
			{
				return( i )
			}
		}
		return( -1 )
	}
	
	Attack( dmg )
	{
		this.heartBar.Attack( dmg )
	}
}

Player.armorSound = new Sound( "Audio/EquipArmor" )
Player.hpSound = new Sound( "Audio/EquipFood" )
Player.footstepSound = new SoundEffect( "Audio/Footstep",3 )
Player.pickupFoodSound = new Sound( "Audio/PickupFood" )
Player.pickupArmorSound = new Sound( "Audio/PickupSword" )
Player.pickupWeaponSound = new Sound( "Audio/WeaponBreak" )
Player.attackSound = new Sound( "Audio/PlayerAttack" )