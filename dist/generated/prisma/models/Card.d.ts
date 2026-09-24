import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CardModel = runtime.Types.Result.DefaultSelection<Prisma.$CardPayload>;
export type AggregateCard = {
    _count: CardCountAggregateOutputType | null;
    _avg: CardAvgAggregateOutputType | null;
    _sum: CardSumAggregateOutputType | null;
    _min: CardMinAggregateOutputType | null;
    _max: CardMaxAggregateOutputType | null;
};
export type CardAvgAggregateOutputType = {
    id: number | null;
    position: number | null;
    listId: number | null;
};
export type CardSumAggregateOutputType = {
    id: number | null;
    position: number | null;
    listId: number | null;
};
export type CardMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    position: number | null;
    listId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CardMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    description: string | null;
    position: number | null;
    listId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CardCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    position: number;
    listId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CardAvgAggregateInputType = {
    id?: true;
    position?: true;
    listId?: true;
};
export type CardSumAggregateInputType = {
    id?: true;
    position?: true;
    listId?: true;
};
export type CardMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    position?: true;
    listId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CardMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    position?: true;
    listId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CardCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    position?: true;
    listId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CardAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithRelationInput | Prisma.CardOrderByWithRelationInput[];
    cursor?: Prisma.CardWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CardCountAggregateInputType;
    _avg?: CardAvgAggregateInputType;
    _sum?: CardSumAggregateInputType;
    _min?: CardMinAggregateInputType;
    _max?: CardMaxAggregateInputType;
};
export type GetCardAggregateType<T extends CardAggregateArgs> = {
    [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCard[P]> : Prisma.GetScalarType<T[P], AggregateCard[P]>;
};
export type CardGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithAggregationInput | Prisma.CardOrderByWithAggregationInput[];
    by: Prisma.CardScalarFieldEnum[] | Prisma.CardScalarFieldEnum;
    having?: Prisma.CardScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CardCountAggregateInputType | true;
    _avg?: CardAvgAggregateInputType;
    _sum?: CardSumAggregateInputType;
    _min?: CardMinAggregateInputType;
    _max?: CardMaxAggregateInputType;
};
export type CardGroupByOutputType = {
    id: number;
    title: string;
    description: string | null;
    position: number;
    listId: number;
    createdAt: Date;
    updatedAt: Date;
    _count: CardCountAggregateOutputType | null;
    _avg: CardAvgAggregateOutputType | null;
    _sum: CardSumAggregateOutputType | null;
    _min: CardMinAggregateOutputType | null;
    _max: CardMaxAggregateOutputType | null;
};
export type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CardGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CardGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CardGroupByOutputType[P]>;
}>>;
export type CardWhereInput = {
    AND?: Prisma.CardWhereInput | Prisma.CardWhereInput[];
    OR?: Prisma.CardWhereInput[];
    NOT?: Prisma.CardWhereInput | Prisma.CardWhereInput[];
    id?: Prisma.IntFilter<"Card"> | number;
    title?: Prisma.StringFilter<"Card"> | string;
    description?: Prisma.StringNullableFilter<"Card"> | string | null;
    position?: Prisma.IntFilter<"Card"> | number;
    listId?: Prisma.IntFilter<"Card"> | number;
    createdAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
    list?: Prisma.XOR<Prisma.ListScalarRelationFilter, Prisma.ListWhereInput>;
};
export type CardOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    list?: Prisma.ListOrderByWithRelationInput;
};
export type CardWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.CardWhereInput | Prisma.CardWhereInput[];
    OR?: Prisma.CardWhereInput[];
    NOT?: Prisma.CardWhereInput | Prisma.CardWhereInput[];
    title?: Prisma.StringFilter<"Card"> | string;
    description?: Prisma.StringNullableFilter<"Card"> | string | null;
    position?: Prisma.IntFilter<"Card"> | number;
    listId?: Prisma.IntFilter<"Card"> | number;
    createdAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
    list?: Prisma.XOR<Prisma.ListScalarRelationFilter, Prisma.ListWhereInput>;
}, "id">;
export type CardOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CardCountOrderByAggregateInput;
    _avg?: Prisma.CardAvgOrderByAggregateInput;
    _max?: Prisma.CardMaxOrderByAggregateInput;
    _min?: Prisma.CardMinOrderByAggregateInput;
    _sum?: Prisma.CardSumOrderByAggregateInput;
};
export type CardScalarWhereWithAggregatesInput = {
    AND?: Prisma.CardScalarWhereWithAggregatesInput | Prisma.CardScalarWhereWithAggregatesInput[];
    OR?: Prisma.CardScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CardScalarWhereWithAggregatesInput | Prisma.CardScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Card"> | number;
    title?: Prisma.StringWithAggregatesFilter<"Card"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Card"> | string | null;
    position?: Prisma.IntWithAggregatesFilter<"Card"> | number;
    listId?: Prisma.IntWithAggregatesFilter<"Card"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Card"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Card"> | Date | string;
};
export type CardCreateInput = {
    title: string;
    description?: string | null;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    list: Prisma.ListCreateNestedOneWithoutCardsInput;
};
export type CardUncheckedCreateInput = {
    id?: number;
    title: string;
    description?: string | null;
    position?: number;
    listId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CardUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    list?: Prisma.ListUpdateOneRequiredWithoutCardsNestedInput;
};
export type CardUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    listId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardCreateManyInput = {
    id?: number;
    title: string;
    description?: string | null;
    position?: number;
    listId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CardUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    listId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardListRelationFilter = {
    every?: Prisma.CardWhereInput;
    some?: Prisma.CardWhereInput;
    none?: Prisma.CardWhereInput;
};
export type CardOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CardCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CardAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
};
export type CardMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CardMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CardSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    listId?: Prisma.SortOrder;
};
export type CardCreateNestedManyWithoutListInput = {
    create?: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput> | Prisma.CardCreateWithoutListInput[] | Prisma.CardUncheckedCreateWithoutListInput[];
    connectOrCreate?: Prisma.CardCreateOrConnectWithoutListInput | Prisma.CardCreateOrConnectWithoutListInput[];
    createMany?: Prisma.CardCreateManyListInputEnvelope;
    connect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
};
export type CardUncheckedCreateNestedManyWithoutListInput = {
    create?: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput> | Prisma.CardCreateWithoutListInput[] | Prisma.CardUncheckedCreateWithoutListInput[];
    connectOrCreate?: Prisma.CardCreateOrConnectWithoutListInput | Prisma.CardCreateOrConnectWithoutListInput[];
    createMany?: Prisma.CardCreateManyListInputEnvelope;
    connect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
};
export type CardUpdateManyWithoutListNestedInput = {
    create?: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput> | Prisma.CardCreateWithoutListInput[] | Prisma.CardUncheckedCreateWithoutListInput[];
    connectOrCreate?: Prisma.CardCreateOrConnectWithoutListInput | Prisma.CardCreateOrConnectWithoutListInput[];
    upsert?: Prisma.CardUpsertWithWhereUniqueWithoutListInput | Prisma.CardUpsertWithWhereUniqueWithoutListInput[];
    createMany?: Prisma.CardCreateManyListInputEnvelope;
    set?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    disconnect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    delete?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    connect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    update?: Prisma.CardUpdateWithWhereUniqueWithoutListInput | Prisma.CardUpdateWithWhereUniqueWithoutListInput[];
    updateMany?: Prisma.CardUpdateManyWithWhereWithoutListInput | Prisma.CardUpdateManyWithWhereWithoutListInput[];
    deleteMany?: Prisma.CardScalarWhereInput | Prisma.CardScalarWhereInput[];
};
export type CardUncheckedUpdateManyWithoutListNestedInput = {
    create?: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput> | Prisma.CardCreateWithoutListInput[] | Prisma.CardUncheckedCreateWithoutListInput[];
    connectOrCreate?: Prisma.CardCreateOrConnectWithoutListInput | Prisma.CardCreateOrConnectWithoutListInput[];
    upsert?: Prisma.CardUpsertWithWhereUniqueWithoutListInput | Prisma.CardUpsertWithWhereUniqueWithoutListInput[];
    createMany?: Prisma.CardCreateManyListInputEnvelope;
    set?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    disconnect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    delete?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    connect?: Prisma.CardWhereUniqueInput | Prisma.CardWhereUniqueInput[];
    update?: Prisma.CardUpdateWithWhereUniqueWithoutListInput | Prisma.CardUpdateWithWhereUniqueWithoutListInput[];
    updateMany?: Prisma.CardUpdateManyWithWhereWithoutListInput | Prisma.CardUpdateManyWithWhereWithoutListInput[];
    deleteMany?: Prisma.CardScalarWhereInput | Prisma.CardScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type CardCreateWithoutListInput = {
    title: string;
    description?: string | null;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CardUncheckedCreateWithoutListInput = {
    id?: number;
    title: string;
    description?: string | null;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CardCreateOrConnectWithoutListInput = {
    where: Prisma.CardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput>;
};
export type CardCreateManyListInputEnvelope = {
    data: Prisma.CardCreateManyListInput | Prisma.CardCreateManyListInput[];
    skipDuplicates?: boolean;
};
export type CardUpsertWithWhereUniqueWithoutListInput = {
    where: Prisma.CardWhereUniqueInput;
    update: Prisma.XOR<Prisma.CardUpdateWithoutListInput, Prisma.CardUncheckedUpdateWithoutListInput>;
    create: Prisma.XOR<Prisma.CardCreateWithoutListInput, Prisma.CardUncheckedCreateWithoutListInput>;
};
export type CardUpdateWithWhereUniqueWithoutListInput = {
    where: Prisma.CardWhereUniqueInput;
    data: Prisma.XOR<Prisma.CardUpdateWithoutListInput, Prisma.CardUncheckedUpdateWithoutListInput>;
};
export type CardUpdateManyWithWhereWithoutListInput = {
    where: Prisma.CardScalarWhereInput;
    data: Prisma.XOR<Prisma.CardUpdateManyMutationInput, Prisma.CardUncheckedUpdateManyWithoutListInput>;
};
export type CardScalarWhereInput = {
    AND?: Prisma.CardScalarWhereInput | Prisma.CardScalarWhereInput[];
    OR?: Prisma.CardScalarWhereInput[];
    NOT?: Prisma.CardScalarWhereInput | Prisma.CardScalarWhereInput[];
    id?: Prisma.IntFilter<"Card"> | number;
    title?: Prisma.StringFilter<"Card"> | string;
    description?: Prisma.StringNullableFilter<"Card"> | string | null;
    position?: Prisma.IntFilter<"Card"> | number;
    listId?: Prisma.IntFilter<"Card"> | number;
    createdAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Card"> | Date | string;
};
export type CardCreateManyListInput = {
    id?: number;
    title: string;
    description?: string | null;
    position?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CardUpdateWithoutListInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardUncheckedUpdateWithoutListInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardUncheckedUpdateManyWithoutListInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CardSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    listId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["card"]>;
export type CardSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    listId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["card"]>;
export type CardSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    listId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["card"]>;
export type CardSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    listId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CardOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "position" | "listId" | "createdAt" | "updatedAt", ExtArgs["result"]["card"]>;
export type CardInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
};
export type CardIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
};
export type CardIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    list?: boolean | Prisma.ListDefaultArgs<ExtArgs>;
};
export type $CardPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Card";
    objects: {
        list: Prisma.$ListPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        title: string;
        description: string | null;
        position: number;
        listId: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["card"]>;
    composites: {};
};
export type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CardPayload, S>;
export type CardCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CardCountAggregateInputType | true;
};
export interface CardDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Card'];
        meta: {
            name: 'Card';
        };
    };
    findUnique<T extends CardFindUniqueArgs>(args: Prisma.SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CardFindFirstArgs>(args?: Prisma.SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CardFindManyArgs>(args?: Prisma.SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CardCreateArgs>(args: Prisma.SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CardCreateManyArgs>(args?: Prisma.SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CardCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CardDeleteArgs>(args: Prisma.SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CardUpdateArgs>(args: Prisma.SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CardDeleteManyArgs>(args?: Prisma.SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CardUpdateManyArgs>(args: Prisma.SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CardUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CardUpsertArgs>(args: Prisma.SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma.Prisma__CardClient<runtime.Types.Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CardCountArgs>(args?: Prisma.Subset<T, CardCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CardCountAggregateOutputType> : number>;
    aggregate<T extends CardAggregateArgs>(args: Prisma.Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>;
    groupBy<T extends CardGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CardGroupByArgs['orderBy'];
    } : {
        orderBy?: CardGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CardFieldRefs;
}
export interface Prisma__CardClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    list<T extends Prisma.ListDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ListDefaultArgs<ExtArgs>>): Prisma.Prisma__ListClient<runtime.Types.Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CardFieldRefs {
    readonly id: Prisma.FieldRef<"Card", 'Int'>;
    readonly title: Prisma.FieldRef<"Card", 'String'>;
    readonly description: Prisma.FieldRef<"Card", 'String'>;
    readonly position: Prisma.FieldRef<"Card", 'Int'>;
    readonly listId: Prisma.FieldRef<"Card", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Card", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Card", 'DateTime'>;
}
export type CardFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    where: Prisma.CardWhereUniqueInput;
};
export type CardFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    where: Prisma.CardWhereUniqueInput;
};
export type CardFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CardFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CardFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CardCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CardCreateInput, Prisma.CardUncheckedCreateInput>;
};
export type CardCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CardCreateManyInput | Prisma.CardCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CardCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    data: Prisma.CardCreateManyInput | Prisma.CardCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CardIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CardUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CardUpdateInput, Prisma.CardUncheckedUpdateInput>;
    where: Prisma.CardWhereUniqueInput;
};
export type CardUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CardUpdateManyMutationInput, Prisma.CardUncheckedUpdateManyInput>;
    where?: Prisma.CardWhereInput;
    limit?: number;
};
export type CardUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CardUpdateManyMutationInput, Prisma.CardUncheckedUpdateManyInput>;
    where?: Prisma.CardWhereInput;
    limit?: number;
    include?: Prisma.CardIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CardUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    where: Prisma.CardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CardCreateInput, Prisma.CardUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CardUpdateInput, Prisma.CardUncheckedUpdateInput>;
};
export type CardDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
    where: Prisma.CardWhereUniqueInput;
};
export type CardDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CardWhereInput;
    limit?: number;
};
export type CardDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CardSelect<ExtArgs> | null;
    omit?: Prisma.CardOmit<ExtArgs> | null;
    include?: Prisma.CardInclude<ExtArgs> | null;
};
