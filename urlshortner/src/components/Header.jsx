import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
	const navigate = useNavigate();
	return (
		<div className="min-h-16 bg-gray-800 text-white">
			<div className="sm:w-[80%] flex items-center justify-between">
				<div className="text-lg font-semibold">Logo</div>
				<div>
					<Button variant="outline" className="text-gray-600 text-md">
						Login
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Header;
