class Range
{
	constructor( min,max )
	{
		this.min = min
		this.max = max
	}
	
	Rand()
	{
		return( Random.Range( this.min,this.max ) )
	}
}