class SitesController < ApplicationController
	def play
		render layout: "play-application"
	end

	def paint
		render layout: "paint-application"
	end

	def map
		render layout: "map-application"
	end
	
	def maquette1
		render layout: "maquette1-application"
	end

	def maquette2
		render layout: "maquette2-application"
	end

	def maquette3
		render layout: "maquette3-application"
	end
end
