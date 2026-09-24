import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ListModel = runtime.Types.Result.DefaultSelection<Prisma.$ListPayload>;
export type AggregateList = {
    _count: ListCountAggregateOutputType | null;
    _avg: ListAvgAggregateOutputType | null;
    _sum: ListSumAggregateOutputType | null;
    _min: ListMinAggregateOutputType | null;
    _max: ListMaxAggregateOutputType | null;
};
export type ListAvgAggregateOutputType = {
    id: number | null;
    position: number | null;
    ownerId: number | null;
};
export type ListSumAggregateOutputType = {
    id: number | null;
    position: number | null;
    ownerId: number | null;
};
export type ListMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    position: number | null;
    ownerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ListMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    position: number | null;
    ownerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ListCountAggregateOutputType = {
    id: number;
    title: number;
    position: number;
    ownerId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ListAvgAggregateInputType = {
    id?: true;
    position?: true;
    ownerId?: true;
};
export type ListSumAggregateInputType = {
    id?: true;
    position?: true;
    ownerId?: true;
};
export type ListMinAggregateInputType = {
    id?: true;
    title?: true;
    position?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ListMaxAggregateInputType = {
    id?: true;
    title?: true;
    position?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ListCountAggregateInputType = {
    id?: true;
    title?: true;
    position?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ListAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput | Prisma.ListOrderByWithRelationInput[];
    cursor?: Prisma.ListWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ListCountAggregateInputType;
    _avg?: ListAvgAggregateInputType;
    _sum?: ListSumAggregateInputType;
    _min?: ListMinAggregateInputType;
    _max?: ListMaxAggregateInputType;
};
export type GetListAggregateType<T extends ListAggregateArgs> = {
    [P in keyof T & keyof AggregateList]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateList[P]> : Prisma.GetScalarType<T[P], AggregateList[P]>;
};
export type ListGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithAggregationInput | Prisma.ListOrderByWithAggregationInput[];
    by: Prisma.ListScalarFieldEnum[] | Prisma.ListScalarFieldEnum;
    having?: Prisma.ListScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ListCountAggregateInputType | true;
    _avg?: ListAvgAggregateInputType;
    _sum?: ListSumAggregateInputType;
    _min?: ListMinAggregateInputType;
    _max?: ListMaxAggregateInputType;
};
export type ListGroupByOutputType = {
    id: number;
    title: string;
    position: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ListCountAggregateOutputType | null;
    _avg: ListAvgAggregateOutputType | null;
    _sum: ListSumAggregateOutputType | null;
    _min: ListMinAggregateOutputType | null;
    _max: ListMaxAggregateOutputType | null;
};
export type GetListGroupByPayload<T extends ListGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ListGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ListGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ListGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ListGroupByOutputType[P]>;
}>>;
export type ListWhereInput = {
    AND?: Prisma.ListWhereInput | Prisma.ListWhereInput[];
    OR?: Prisma.ListWhereInput[];
    NOT?: Prisma.ListWhereInput | Prisma.ListWhereInput[];
    id?: Prisma.IntFilter<"List"> | number;
    title?: Prisma.StringFilter<"List"> | string;
    position?: Prisma.IntFilter<"List"> | number;
    ownerId?: Prisma.IntFilter<"List"> | number;
    createdAt?: Prisma.DateTimeFilter<"List"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"List"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    cards?: Prisma.CardListRelationFilter;
};
export type ListOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    cards?: Prisma.CardOrderByRelationAggregateInput;
};
export type ListWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ListWhereInput | Prisma.ListWhereInput[];
    OR?: Prisma.ListWhereInput[];
    NOT?: Prisma.ListWhereInput | Prisma.ListWhereInput[];
    title?: Prisma.StringFilter<"List"> | string;
    position?: Prisma.IntFilter<"List"> | number;
    ownerId?: Prisma.IntFilter<"List"> | number;
    createdAt?: Prisma.DateTimeFilter<"List"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"List"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    cards?: Prisma.CardListRelationFilter;
}, "id">;
export type ListOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ListCountOrderByAggregateInput;
    _avg?: Prisma.ListAvgOrderByAggregateInput;
    _max?: Prisma.ListMaxOrderByAggregateInput;
    _min?: Prisma.ListMinOrderByAggregateInput;
    _sum?: Prisma.ListSumOrderByAggregateInput;
};
export type ListScalarWhereWithAggregatesInput = {
    AND?: Prisma.ListScalarWhereWithAggregatesInput | Prisma.ListScalarWhereWithAggregatesInput[];
    OR?: Prisma.ListScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ListScalarWhereWithAggregatesInput | Prisma.ListScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"List"> | number;
    title?: Prisma.StringWithAggregatesFilter<"List"> | string;
    position?: Prisma.IntWithAggregatesFilter<"List"> | number;
    ownerId?: Prisma.IntWithAggregatesFilter<"List"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"List"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"List"> | Date | string;
};
export type ListCreateInput = {
    title: string;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutListsInput;
    cards?: Prisma.CardCreateNestedManyWithoutListInput;
};
export type ListUncheckedCreateInput = {
    id?: number;
    title: string;
    position?: number;
    ownerId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cards?: Prisma.CardUncheckedCreateNestedManyWithoutListInput;
};
export type ListUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutListsNestedInput;
    cards?: Prisma.CardUpdateManyWithoutListNestedInput;
};
export type ListUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cards?: Prisma.CardUncheckedUpdateManyWithoutListNestedInput;
};
export type ListCreateManyInput = {
    id?: number;
    title: string;
    position?: number;
    ownerId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ListUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ListUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ListListRelationFilter = {
    every?: Prisma.ListWhereInput;
    some?: Prisma.ListWhereInput;
    none?: Prisma.ListWhereInput;
};
export type ListOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ListCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ListAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
};
export type ListMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ListMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ListSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
};
export type ListScalarRelationFilter = {
    is?: Prisma.ListWhereInput;
    isNot?: Prisma.ListWhereInput;
};
export type ListCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput> | Prisma.ListCreateWithoutOwnerInput[] | Prisma.ListUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutOwnerInput | Prisma.ListCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.ListCreateManyOwnerInputEnvelope;
    connect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
};
export type ListUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput> | Prisma.ListCreateWithoutOwnerInput[] | Prisma.ListUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutOwnerInput | Prisma.ListCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.ListCreateManyOwnerInputEnvelope;
    connect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
};
export type ListUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput> | Prisma.ListCreateWithoutOwnerInput[] | Prisma.ListUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutOwnerInput | Prisma.ListCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.ListUpsertWithWhereUniqueWithoutOwnerInput | Prisma.ListUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.ListCreateManyOwnerInputEnvelope;
    set?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    disconnect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    delete?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    connect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    update?: Prisma.ListUpdateWithWhereUniqueWithoutOwnerInput | Prisma.ListUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.ListUpdateManyWithWhereWithoutOwnerInput | Prisma.ListUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.ListScalarWhereInput | Prisma.ListScalarWhereInput[];
};
export type ListUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput> | Prisma.ListCreateWithoutOwnerInput[] | Prisma.ListUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutOwnerInput | Prisma.ListCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.ListUpsertWithWhereUniqueWithoutOwnerInput | Prisma.ListUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.ListCreateManyOwnerInputEnvelope;
    set?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    disconnect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    delete?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    connect?: Prisma.ListWhereUniqueInput | Prisma.ListWhereUniqueInput[];
    update?: Prisma.ListUpdateWithWhereUniqueWithoutOwnerInput | Prisma.ListUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.ListUpdateManyWithWhereWithoutOwnerInput | Prisma.ListUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.ListScalarWhereInput | Prisma.ListScalarWhereInput[];
};
export type ListCreateNestedOneWithoutCardsInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutCardsInput, Prisma.ListUncheckedCreateWithoutCardsInput>;
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutCardsInput;
    connect?: Prisma.ListWhereUniqueInput;
};
export type ListUpdateOneRequiredWithoutCardsNestedInput = {
    create?: Prisma.XOR<Prisma.ListCreateWithoutCardsInput, Prisma.ListUncheckedCreateWithoutCardsInput>;
    connectOrCreate?: Prisma.ListCreateOrConnectWithoutCardsInput;
    upsert?: Prisma.ListUpsertWithoutCardsInput;
    connect?: Prisma.ListWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ListUpdateToOneWithWhereWithoutCardsInput, Prisma.ListUpdateWithoutCardsInput>, Prisma.ListUncheckedUpdateWithoutCardsInput>;
};
export type ListCreateWithoutOwnerInput = {
    title: string;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cards?: Prisma.CardCreateNestedManyWithoutListInput;
};
export type ListUncheckedCreateWithoutOwnerInput = {
    id?: number;
    title: string;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cards?: Prisma.CardUncheckedCreateNestedManyWithoutListInput;
};
export type ListCreateOrConnectWithoutOwnerInput = {
    where: Prisma.ListWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput>;
};
export type ListCreateManyOwnerInputEnvelope = {
    data: Prisma.ListCreateManyOwnerInput | Prisma.ListCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type ListUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.ListWhereUniqueInput;
    update: Prisma.XOR<Prisma.ListUpdateWithoutOwnerInput, Prisma.ListUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.ListCreateWithoutOwnerInput, Prisma.ListUncheckedCreateWithoutOwnerInput>;
};
export type ListUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.ListWhereUniqueInput;
    data: Prisma.XOR<Prisma.ListUpdateWithoutOwnerInput, Prisma.ListUncheckedUpdateWithoutOwnerInput>;
};
export type ListUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.ListScalarWhereInput;
    data: Prisma.XOR<Prisma.ListUpdateManyMutationInput, Prisma.ListUncheckedUpdateManyWithoutOwnerInput>;
};
export type ListScalarWhereInput = {
    AND?: Prisma.ListScalarWhereInput | Prisma.ListScalarWhereInput[];
    OR?: Prisma.ListScalarWhereInput[];
    NOT?: Prisma.ListScalarWhereInput | Prisma.ListScalarWhereInput[];
    id?: Prisma.IntFilter<"List"> | number;
    title?: Prisma.StringFilter<"List"> | string;
    position?: Prisma.IntFilter<"List"> | number;
    ownerId?: Prisma.IntFilter<"List"> | number;
    createdAt?: Prisma.DateTimeFilter<"List"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"List"> | Date | string;
};
export type ListCreateWithoutCardsInput = {
    title: string;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutListsInput;
};
export type ListUncheckedCreateWithoutCardsInput = {
    id?: number;
    title: string;
    position?: number;
    ownerId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ListCreateOrConnectWithoutCardsInput = {
    where: Prisma.ListWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListCreateWithoutCardsInput, Prisma.ListUncheckedCreateWithoutCardsInput>;
};
export type ListUpsertWithoutCardsInput = {
    update: Prisma.XOR<Prisma.ListUpdateWithoutCardsInput, Prisma.ListUncheckedUpdateWithoutCardsInput>;
    create: Prisma.XOR<Prisma.ListCreateWithoutCardsInput, Prisma.ListUncheckedCreateWithoutCardsInput>;
    where?: Prisma.ListWhereInput;
};
export type ListUpdateToOneWithWhereWithoutCardsInput = {
    where?: Prisma.ListWhereInput;
    data: Prisma.XOR<Prisma.ListUpdateWithoutCardsInput, Prisma.ListUncheckedUpdateWithoutCardsInput>;
};
export type ListUpdateWithoutCardsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutListsNestedInput;
};
export type ListUncheckedUpdateWithoutCardsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    ownerId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ListCreateManyOwnerInput = {
    id?: number;
    title: string;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ListUpdateWithoutOwnerInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cards?: Prisma.CardUpdateManyWithoutListNestedInput;
};
export type ListUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cards?: Prisma.CardUncheckedUpdateManyWithoutListNestedInput;
};
export type ListUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ListCountOutputType = {
    cards: number;
};
export type ListCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cards?: boolean | ListCountOutputTypeCountCardsArgs;
};
export type ListCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListCountOutputTypeSelect<ExtArgs> | null;
};
export type ListCountOutputTypeCountCardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CardWhereInput;
};
export type ListSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    position?: boolean;
    ownerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    cards?: boolean | Prisma.List$cardsArgs<ExtArgs>;
    _count?: boolean | Prisma.ListCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["list"]>;
export type ListSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    position?: boolean;
    ownerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["list"]>;
export type ListSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    position?: boolean;
    ownerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["list"]>;
export type ListSelectScalar = {
    id?: boolean;
    title?: boolean;
    position?: boolean;
    ownerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ListOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "position" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["list"]>;
export type ListInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    cards?: boolean | Prisma.List$cardsArgs<ExtArgs>;
    _count?: boolean | Prisma.ListCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ListIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ListIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ListPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "List";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs>;
        cards: Prisma.$CardPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        position: number;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["list"]>;
    composites: {};
};
export type ListGetPayload<S extends boolean | null | undefined | ListDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ListPayload, S>;
export type ListCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ListCountAggregateInputType | true;
};
export interface ListDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['List'];
        meta: {
            name: 'List';
        };
    };
    findUnique<T extends ListFindUniqueArgs>(args: Prisma.SelectSubset<T, ListFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ListFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ListFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ListFindFirstArgs>(args?: Prisma.SelectSubset<T, ListFindFirstArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ListFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ListFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ListFindManyArgs>(args?: Prisma.SelectSubset<T, ListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ListCreateArgs>(args: Prisma.SelectSubset<T, ListCreateArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ListCreateManyArgs>(args?: Prisma.SelectSubset<T, ListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ListCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ListDeleteArgs>(args: Prisma.SelectSubset<T, ListDeleteArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ListUpdateArgs>(args: Prisma.SelectSubset<T, ListUpdateArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ListDeleteManyArgs>(args?: Prisma.SelectSubset<T, ListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ListUpdateManyArgs>(args: Prisma.SelectSubset<T, ListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ListUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ListUpsertArgs>(args: Prisma.SelectSubset<T, ListUpsertArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ListCountArgs>(args?: Prisma.Subset<T, ListCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ListCountAggregateOutputType> : number>;
    aggregate<T extends ListAggregateArgs>(args: Prisma.Subset<T, ListAggregateArgs>): Prisma.PrismaPromise<GetListAggregateType<T>>;
    groupBy<T extends ListGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ListGroupByArgs['orderBy'];
    } : {
        orderBy?: ListGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ListFieldRefs;
}
export interface Prisma__ListClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    cards<T extends Prisma.List$cardsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.List$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ListFieldRefs {
    readonly id: Prisma.FieldRef<"List", 'Int'>;
    readonly title: Prisma.FieldRef<"List", 'String'>;
    readonly position: Prisma.FieldRef<"List", 'Int'>;
    readonly ownerId: Prisma.FieldRef<"List", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"List", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"List", 'DateTime'>;
}
export type ListFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where: Prisma.ListWhereUniqueInput;
};
export type ListFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where: Prisma.ListWhereUniqueInput;
};
export type ListFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput | Prisma.ListOrderByWithRelationInput[];
    cursor?: Prisma.ListWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListScalarFieldEnum | Prisma.ListScalarFieldEnum[];
};
export type ListFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput | Prisma.ListOrderByWithRelationInput[];
    cursor?: Prisma.ListWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListScalarFieldEnum | Prisma.ListScalarFieldEnum[];
};
export type ListFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByWithRelationInput | Prisma.ListOrderByWithRelationInput[];
    cursor?: Prisma.ListWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListScalarFieldEnum | Prisma.ListScalarFieldEnum[];
};
export type ListCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ListCreateInput, Prisma.ListUncheckedCreateInput>;
};
export type ListCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ListCreateManyInput | Prisma.ListCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ListCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    data: Prisma.ListCreateManyInput | Prisma.ListCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ListIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ListUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ListUpdateInput, Prisma.ListUncheckedUpdateInput>;
    where: Prisma.ListWhereUniqueInput;
};
export type ListUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ListUpdateManyMutationInput, Prisma.ListUncheckedUpdateManyInput>;
    where?: Prisma.ListWhereInput;
    limit?: number;
};
export type ListUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ListUpdateManyMutationInput, Prisma.ListUncheckedUpdateManyInput>;
    where?: Prisma.ListWhereInput;
    limit?: number;
    include?: Prisma.ListIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ListUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where: Prisma.ListWhereUniqueInput;
    create: Prisma.XOR<Prisma.ListCreateInput, Prisma.ListUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ListUpdateInput, Prisma.ListUncheckedUpdateInput>;
};
export type ListDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
    where: Prisma.ListWhereUniqueInput;
};
export type ListDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListWhereInput;
    limit?: number;
};
export type List$cardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithRelationInput | Prisma.CardOrderByWithRelationInput[];
    cursor?: Prisma.CardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CardScalarFieldEnum | Prisma.CardScalarFieldEnum[];
};
export type ListDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListSelect<ExtArgs> | null;
    omit?: Prisma.ListOmit<ExtArgs> | null;
    include?: Prisma.ListInclude<ExtArgs> | null;
};
