import defaultUserAvatar from "@/assets/images/resultsnotfound.webp";
import { GradientButton } from "../ui/custom/gradientButton";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/UserHook";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ProfileStatsCard } from "./ProfileStatsCard";
import { CARDS } from "@/utilities/constants";

export const Profile = () => {
	const { user } = useUser();
	useEffect(() => {
		if (!user?.id) {
			toast.error("Not logged in");
		}
	}, [user]);
	return (
		<section className="w-full bg-black/25 flex flex-col my-12 rounded-lg">
			<div className="flex flex-col h-fit max-h-[450px] pb-4 px-4">
				<div className="my-4 bg-gradient-to-r pb-1 from-[#5539cc] from-15% to-[#0066cd]">
					<div className="bg-black/75 p-4">
						<h1 className="text-xl font-semibold">
							{user?.username}
						</h1>
					</div>
				</div>
				<div className="flex justify-between items-start">
					<img
						className="w-64 aspect-square rounded-sm border-2 border-[#5539cc]"
						src={defaultUserAvatar}
						alt=""
					/>
					<div className="px-4 max-w-[300px] overflow-y-auto">
						<h3 className="text-lg">About me</h3>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Reiciendis temporibus sapiente odit asperiores
							enim at modi voluptas officia? Veniam, temporibus
							qui a ea blanditiis eligendi ducimus hic quod
							adipisci earum? Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Libero, voluptas.
							Voluptatibus (350)
						</p>
					</div>
					<div className="px-4">
						<h3 className="text-lg">Account created</h3>
						<p>{new Date(user?.createdAt || "").toDateString()}</p>
					</div>
					<div className="px-4">
						<h3 className="text-lg">Account id</h3>
						<p>{user?.id}</p>
					</div>
					<div className="px-4">
						<h3 className="text-lg">Account role</h3>
						<p>{user?.userRole}</p>
					</div>
					<div className="flex flex-col gap-4">
						<Button className="bg-red-700">Report user</Button>
						<Button className="bg-violet-600">
							Send a message
						</Button>
						<Button className="bg-green-700">
							Send friend request
						</Button>
						<GradientButton className="py-2 font-light">
							Games list
						</GradientButton>
					</div>
				</div>
			</div>
			<div className="flex-grow flex flex-col px-4">
				<div className="my-4 bg-black/25 p-4">
					<h1 className="text-xl font-semibold">
						{user?.username}'s statistics
					</h1>
				</div>
				<ul className="grid grid-cols-3 grid-rows-2 gap-12 px-8 py-8">
					{CARDS.map((card) => (
						<ProfileStatsCard
							key={card.title + card.value.toString()}
							title={card.title}
							value={card.value}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};
