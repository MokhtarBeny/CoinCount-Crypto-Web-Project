import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCryptoAdminData } from "../../store/thunks/cryptoThunk";
import { selectAdminCrypto } from "../../store/slices/cryptoSlice";

import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";

import {
	Chip,
	CircularProgress,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from "@nextui-org/react";

import { EyeInvisibleTwoTone, EyeTwoTone } from "@ant-design/icons";
import checkAdminRole from "@/utils/auth/admin/checkAdmin";
import { Bounce, toast } from "react-toastify";
import useUpdateCryptoVisibility from "@/service/useUpdateCryptos.service";
import axiosInstance from "@/utils/axios/axiosConfig";
import Link from "next/link";

function AdminDashboard() {
	// **** SERVICES **** //
	const updateCryptoVisibility = useUpdateCryptoVisibility();

	// **** VARIABLE **** //
	const dispatch: AppDispatch = useDispatch();
	const { crypto, loading, error } = useSelector(selectAdminCrypto);
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
	const [cryptos, setCryptos] = useState([]); // State to track admin status

	// Table
	const [page, setPage] = React.useState(1);
	const rowsPerPage = 12;
	// Check if crypto is not null before accessing length
	const pages = crypto ? Math.ceil(crypto.length / rowsPerPage) : 0;

	const items = React.useMemo(() => {
		// Ensure crypto is an array before slicing
		if (Array.isArray(crypto)) {
			const start = (page - 1) * rowsPerPage;
			const end = start + rowsPerPage;
			return crypto.slice(start, end);
		}
		return []; // Return an empty array if crypto is not an array
	}, [page, crypto, rowsPerPage]);

	// Change crypto visibility

	const handleChangeVisibility = (cryptoId: string, index) => {
		const updatedCryptos = cryptos.map((item, idx) => {
			if (idx === index) {
				return { ...item, visibility: !item.visibility };
			}
			return item;
		});

		// items[index].visibility = !items[index].visibility
		updateCryptoVisibility.fetchData(cryptoId);
		setCryptos(updatedCryptos); // Update the state with the new array
	};

	useEffect(() => {
		setCryptos(items);
	}, [items]);

	useEffect(() => {
		if (updateCryptoVisibility.data) {
			toast.success("Visibility successfully modified", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
		}
		if (updateCryptoVisibility.error) {
			toast.error("An error has occurred", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
		}
	}, [updateCryptoVisibility.data, updateCryptoVisibility.error]);

	// Admin
	useEffect(() => {
		const checkRole = async () => {
			const isAdmin = await checkAdminRole(axiosInstance, router);
			setIsAdmin(isAdmin);
		};
		checkRole();
	}, [router]);

	// Crypto Data
	useEffect(() => {
		dispatch(fetchCryptoAdminData());
	}, [dispatch]);

	const viewOtherAdminPage = () => {
		return(
			<div className="flex justify-end my-2">
				<Link href="/admin/articles"
					className="border-danger border-1 text-danger rounded-md px-2 py-2"
				>
					Edit Flux Rss Articles
				</Link>
			</div>

		)
	}


	// Table Pagination
	const bottomContent = React.useMemo(() => {
		return (
			<>
			<div className="flex w-full justify-center">

				<Pagination
					isCompact
					showControls
					showShadow
					color="secondary"
					page={page}
					total={pages}
					onChange={(page) => setPage(page)}
				/>
			</div>
			</>

		);
	}, [page, pages]);

	if (loading)
		return (
			<div className="flex justify-center">
				{" "}
				<CircularProgress label="Loading..." />
			</div>
		);
	if (error) return <p>Error loading data</p>;
	if (!crypto)
		return (
	<>
	{isAdmin && viewOtherAdminPage()}
			<Table aria-label="Empty Table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>Price</TableColumn>
					<TableColumn>STATUS</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No data available."}>{[]}</TableBody>
			</Table>
	</>

		);

	return (
		<div className="m-12">
			{isAdmin && viewOtherAdminPage()}
			<Table
				aria-label="Crypto Data Table"
				bottomContent={bottomContent}
				classNames={{
					wrapper: "min-h-[222px]",
				}}
				selectionMode="single"
				color="primary"
			>
				<TableHeader>
					<TableColumn>RANK</TableColumn>
					<TableColumn>NAME</TableColumn>
					<TableColumn>SYMBOL</TableColumn>
					<TableColumn>PRICE USD</TableColumn>
					<TableColumn>MARKET CAP USD</TableColumn>
					<TableColumn>Visibility</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{cryptos.map((item, index) => (
						<TableRow key={item.id} className="cursor-pointer">
							<TableCell>{item.rank}</TableCell>
							<TableCell>  <span className="flex">   <img src={item.icon} alt={item.name} className="w-6 h-6 mr-2" />
								{" "}{item.name}</span></TableCell>
							<TableCell>{item.symbol}</TableCell>
							<TableCell>
								{parseFloat(item.priceUsd).toFixed(2)} $
							</TableCell>
							<TableCell>
								{parseFloat(item.marketCapUsd).toFixed(2)}${" "}
							</TableCell>
							<TableCell>
								{" "}
								<Chip
									className={
										item.visibility
											? "bg-green-500/20 text-green-900 font-extrabold"
											: "bg-red-500/20 text-red-900"
									}
								>
									{" "}
									{item.visibility ? "Visible" : "Hidden"}
								</Chip>
							</TableCell>
							<TableCell>
								<div className="relative flex items-center gap-2">
									<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
										{item.visibility ? (
											<>
												{updateCryptoVisibility.isLoading && (
													<CircularProgress
														size="sm"
														label="Loading..."
													/>
												)}
												<EyeTwoTone
													twoToneColor="#52c41a"
													onClick={(e) =>
														handleChangeVisibility(
															item.id,

															index
														)
													}
												/>
											</>
										) : (
											<EyeInvisibleTwoTone
												twoToneColor="#eb2f96"
												onClick={(e) =>
													handleChangeVisibility(
														item.id,

														index
													)
												}
											/>
										)}
									</span>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default AdminDashboard;
