import { IGame } from "@/interfaces/game";
import { fetchGamesByReleasedDate } from "@/services/gameService";
import { API } from "@/utilities/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../utils/Spinner";
import { ArrowRight } from "lucide-react";

export const RecentlyReleased = () => {
	const [recentGames, setRecentGames] = useState<IGame[]>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const getRecentGames = async () => {
				const games = await fetchGamesByReleasedDate("desc");
				if (games) {
					setRecentGames(games.slice(0, 5));
				} else {
					console.error("Failed to fetch games");
					toast.error("Failed to fetch recently released games");
				}
				setLoading(false);
			};
			getRecentGames();
		} catch (error) {
			console.error(error);
			toast.error("Failed to fetch recently released games");
		}
	}, []);

	return (
		<section>
			<a
				href="/explore"
				className="flex items-center h-fit mt-12 hover:cursor-pointer"
			>
				<h2 className="text-3xl font-bold text-white text-center md:text-left">
					Recently released
				</h2>
				<ArrowRight size={"2.5rem"} className="inline mt-1 ml-2" />
			</a>
			{!loading ? (
				<div className="flex flex-col gap-12 my-8">
					{recentGames?.map((game, index) => {
						return (
							<article key={index}>
								<Link to={`/game/${game.id}`}>
									<div className="border-gray-300 text-white flex flex-col md:flex-row items-center justify-between w-full gap-6 bg-[#111] hover:bg-[#222]">
										<div className="h-[200px] md:h-[300px] w-[200px] md:w-[210px] border border-violet-500 card">
											<img
												src={`${API}/proxy-image?imageUrl=${encodeURIComponent(
													game.cover
												)}`}
												crossOrigin="anonymous"
												alt=""
											/>
										</div>
										<div className="flex justify-center items-center text-center">
											<h3 className="text-2xl">
												{game.title}
											</h3>
										</div>
										<ul className="max-h-[300px] flex flex-col gap-1 justify-start xl:justify-center overflow-y-auto xl:mr-12">
											{game.releaseDates.map(
												(date, index) => {
													return (
														<li
															className="text-lg"
															key={index}
														>
															{date.platform} -{" "}
															{new Date(
																date.date
															).toLocaleDateString()}
														</li>
													);
												}
											)}
										</ul>
									</div>
								</Link>
							</article>
						);
					})}
				</div>
			) : (
				<Spinner loading={loading} color="#5539cc" />
			)}
		</section>
	);
};
