class Monster
{
	constructor( tilemap,sprs )
	{
		const randPos = tilemap.GetRandTile()
		this.x = randPos.x
		this.y = randPos.y
		
		this.tilemap = tilemap
		this.sprs = sprs
		this.dir = Random.Range( 0,3 )
		
		this.hp = 1
		this.damage = 1
		
		this.moveRange = 7
	}
	
	Update( player,monsters )
	{
		const xDiff = player.x - this.x
		const yDiff = player.y - this.y
		if( ( xDiff == 0 && Math.abs( yDiff ) == 1 ) ||
			( Math.abs( xDiff ) == 1 && yDiff == 0 ) )
		{
			player.Attack( this.damage )
			Monster.attackSound.Play()
		}
		else if( xDiff * xDiff + yDiff * yDiff < this.moveRange * this.moveRange )
		{
			const path = this.GeneratePath( player.x,player.y )
			if( path.length > 1 )
			{
				const origX = this.x
				const origY = this.y
				this.x = path[1].x
				this.y = path[1].y
				for( let i = 0; i < monsters.length; ++i )
				{
					if( monsters[i].x == this.x && monsters[i].y == this.y &&
						monsters[i] != this )
					{
						this.x = origX
						this.y = origY
					}
				}
				
				if( path[1].y < origY ) this.dir = 0
				else if( path[1].y > origY ) this.dir = 1
				else if( path[1].x < origX ) this.dir = 2
				else if( path[1].x > origX ) this.dir = 3
			}
		}
		
		return( true )
	}
	
	Draw( cam )
	{
		// cam.Draw( this.x,this.y,"red" )
		cam.DrawSpr( this.x,this.y,this.sprs[this.dir],"#DE2C2C" )
	}
	
	Damage( dmg )
	{
		this.hp -= dmg
		Monster.hitSound.Play()
	}
	
	// best first
	GeneratePath( targetX,targetY )
	{
		const pqueue = []
		pqueue.push( { x: this.x,y: this.y,cost: 99999,visited: true,backNode: null } )
		while( pqueue.length > 0 )
		{
			const item = pqueue.splice( 0,1 )[0]
			if( item.x == targetX && item.y == targetY )
			{
				let path = []
				let node = item
				while( node )
				{
					path.unshift( node )
					node = node.backNode
				}
				return( path )
			}
			else
			{
				const neighbors =
				[
					{ x: item.x,y: item.y - 1 },
					{ x: item.x,y: item.y + 1 },
					{ x: item.x - 1,y: item.y },
					{ x: item.x + 1,y: item.y }
				]
				for( let i in neighbors )
				{
					let neigh = neighbors[i]
					const xDiff = neigh.x - targetX
					const yDiff = neigh.y - targetY
					const newDist = xDiff * xDiff + yDiff * yDiff
					
					let setNeigh = false
					for( let j in pqueue )
					{
						if( pqueue[j].x == neigh.x && pqueue[j].y == neigh.y )
						{
							// pqueue[j] = neigh
							neigh = pqueue[j]
							setNeigh = true
							break
						}
					}
					if( !setNeigh )
					{
						neigh.cost = 99999
						neigh.visited = false
						neigh.backNode = null
					}
					
					if( !neigh.visited && this.tilemap.GetTile( neigh.x,neigh.y ) < 1 )
					{
						neigh.visited = true
						neigh.cost = newDist
						neigh.backNode = item
						pqueue.push( neigh )
						pqueue.sort( ( a,b ) => { ( a.cost < b.cost ) ? -1 : 1 } )
					}
					else
					{
						if( newDist < neigh.cost )
						{
							neigh.cost = newDist
							neigh.backNode = item
						}
					}
				}
			}
		}
		return( [] )
	}
	
	GenerateItem( player,curLevel )
	{
		return( Pickup.GenerateItem( -1,curLevel ) )
		// return( Monster.pickups[Random.Range( 0,Monster.pickups.length - 1 )] )
	}
}

// Monster.pickups =
// [
// 	new Item( 1,1,1,new Sprite( "Images/Armor" ) ),
// 	new Item( 2,1,1,new Sprite( "Images/Fruit" ) )
// ]

Monster.attackSound = new SoundEffect( "Audio/EnemyAttack",3 )
Monster.defeatSound = new Sound( "Audio/EnemyDefeat" )
Monster.hitSound = new SoundEffect( "Audio/EnemyHit",3 )